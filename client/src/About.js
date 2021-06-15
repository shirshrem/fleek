import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
});
const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <div> Options Available: </div>
      <li> Search for Movies and add them to MyList</li>
      <li>
        {" "}
        On MyList, use the download icon to get a list of torrents and their
        magnet links
      </li>
      <li>
        {" "}
        Use the Random Movie Generator to get Random movies according to your
        preferences
      </li>
    </ThemeProvider>
  );
};

export default About;
