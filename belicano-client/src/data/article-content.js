import react from "/assets/images/React.png";
import java from "/assets/images/Java.avif";
import css from "/assets/images/Css.png";
import flutter from "/assets/images/Flutter.jpg";

const articles = [
  {
    name: "react",
    title: "React",
    image: react,
    content: [
      "React.js is a JavaScript library used for building modern web user interfaces. It focuses on creating reusable components and efficiently updating the UI when data changes, making it ideal for dynamic applications like dashboards and single-page apps.",
      "Props (short for properties) allow you to pass data between components. They are read-only and essential for component reusability.",
      "Example:\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}",
      "React supports multiple styling approaches: inline styles, CSS files, CSS Modules, and styled-components."
    ]
  },
  {
    name: "java",
    title: "Java",
    image: java,
    content: [
      "Java is a general-purpose, object-oriented programming language used for building a wide range of applications, including Android apps and backend systems.",
      "Java follows the principle of 'Write Once, Run Anywhere' — compiled code runs on any device with a Java Virtual Machine (JVM).",
      "Example:\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}",
      "Java is strongly typed, meaning all variables must be declared with a data type before use, which helps catch errors at compile time."
    ]
  },
  {
    name: "css",
    title: "CSS",
    image: css,
    content: [
      "CSS (Cascading Style Sheets) is used to style and design web pages, controlling things like colors, fonts, spacing, and layout.",
      "CSS works by selecting HTML elements and applying rules to them, making websites visually appealing and consistent.",
      "Example:\np {\n  color: blue;\n  font-size: 16px;\n  margin: 8px 0;\n}",
      "Modern CSS features like Flexbox and Grid make it easier to build responsive layouts that adapt to different screen sizes."
    ]
  },
  {
    name: "flutter",
    title: "Flutter",
    image: flutter,
    content: [
      "Flutter is a UI framework developed by Google used for building cross-platform mobile applications.",
      "It allows developers to create apps for both Android and iOS using a single codebase, focusing on fast performance and smooth, responsive user interfaces.",
      "Example:\nText(\n  'Hello, Flutter!',\n  style: TextStyle(fontSize: 24, color: Colors.blue),\n)",
      "Flutter uses the Dart programming language and provides a rich set of pre-built widgets that follow both Material Design and Cupertino (iOS) guidelines."
    ]
  },
];

export default articles;