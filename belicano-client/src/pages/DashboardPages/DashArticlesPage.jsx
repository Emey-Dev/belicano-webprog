import { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FilterList from "@mui/icons-material/FilterList";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  mapArticleFromApi,
} from "../../services/ArticleService";


const blankForm = {
  name: "",
  title: "",
  imageUrl: "",
  content: [],
};

const truncate = (text, max) => {
  if (!text) return "";
  const s = String(text).trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
};

const DashArticlesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [contentRaw, setContentRaw] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);
      setApiError("");
      const { data } = await fetchArticles();
      const list = data?.articles ?? [];
      setArticles(
        list.map((article) => ({
          ...mapArticleFromApi(article),
          id: article._id,
        }))
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
      setApiError("Unable to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        article.name?.toLowerCase().includes(searchLower) ||
        article.title?.toLowerCase().includes(searchLower) ||
        article.description?.toLowerCase().includes(searchLower);

      const matchesStatus =
        !filterStatus ||
        (filterStatus === "active" ? article.isActive : !article.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchQuery, filterStatus]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("");
  };

  const openModal = (article) => {
    setModal({ open: true, id: article?._id ?? null });
    if (article) {
      setForm({
        name: article.name,
        title: article.title,
        imageUrl: article.imageUrl,
        content: Array.isArray(article.content) ? article.content : [],
      });
      setContentRaw(
        Array.isArray(article.content) ? article.content.join("\n\n") : ""
      );
    } else {
      setForm(blankForm);
      setContentRaw("");
    }
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setContentRaw("");
    setErrors({});
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Article slug is required.";
    }

    if (!form.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!form.content || form.content.length === 0) {
      nextErrors.content = "Article content is required.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      const articleData = {
        name: form.name.trim(),
        title: form.title.trim(),
        imageUrl: form.imageUrl.trim(),
        content: form.content,
      };

      if (modal.id) {
        await updateArticle(modal.id, articleData);
      } else {
        await createArticle(articleData);
      }
      await loadArticles();
      closeModal();
    } catch (error) {
      console.error("Error saving article:", error);
      setApiError("Failed to save article. Please try again.");
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateArticle(id, { isActive: !isActive });
      await loadArticles();
    } catch (error) {
      console.error("Error toggling article status:", error);
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] ?? "",
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    {
      field: "name",
      headerName: "Slug",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.2,
      minWidth: 200,
      valueGetter: (_, row) => truncate(row.description, 100),
    },
    {
      field: "imagePreview",
      headerName: "Image Preview",
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: ({ row }) => (
        <Box
          component="img"
          src={row.imageUrl}
          alt=""
          sx={{
            height: 40,
            maxWidth: 100,
            objectFit: "cover",
            borderRadius: 1,
            display: "block",
            mt: 0.5,
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.3 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            onClick={() => handleToggleActive(row._id, row.isActive)}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
          Articles
        </Typography>
        <TextField
          placeholder="Search by name, title, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: { xs: "100%", sm: 0 }, order: { xs: 3, sm: 0 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ whiteSpace: "nowrap", width: { xs: "100%", sm: "auto" } }}
        >
          Add Article
        </Button>
      </Box>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
            <TextField
              select
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{ minWidth: 150 }}
              size="small"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>

            <Button variant="outlined" size="small" onClick={resetFilters}>
              Reset Filters
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Showing {filteredArticles.length} of {articles.length} articles
          </Typography>
        </Stack>
      </Paper>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {filteredArticles.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            {articles.length === 0
              ? "No articles found. Use Add Article to create your first record."
              : "No articles match your search or filter criteria."}
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit Article" : "Add Article"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                {...fieldProps("name", "Slug (URL name)", {
                  placeholder: "e.g. react-introduction",
                })}
              />
              <TextField {...fieldProps("title", "Title")} />
              <TextField
                {...fieldProps("imageUrl", "Image URL (optional)", {
                  placeholder: "/assets/images/article-image.jpg",
                  helperText: "Public path to image in public/assets/images/ folder",
                })}
              />
              <TextField
                name="content"
                label="Content (Paragraphs)"
                value={contentRaw}
                onChange={(e) => {
                  setContentRaw(e.target.value);
                  const paragraphs = e.target.value
                    .split(/\n\n+/)
                    .map((p) => p.trim())
                    .filter(Boolean);
                  setForm((prev) => ({ ...prev, content: paragraphs }));
                  if (errors.content) {
                    setErrors((prev) => ({ ...prev, content: "" }));
                  }
                }}
                fullWidth
                multiline
                minRows={6}
                placeholder="Separate paragraphs with blank lines"
                error={Boolean(errors.content)}
                helperText={errors.content || "Each paragraph separated by a blank line"}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Save Changes" : "Add Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticlesPage;