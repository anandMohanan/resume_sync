export const Footer = () => {
  return (
    <footer
      id="footer"
      className=" mt-auto flex-shrink bottom-0 w-full bg-background"
    >
      <hr className="w-11/12 mx-auto" />

      <div className="text-center p-5">
        <span>
          &copy; 2024, Made by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/anandMohanan"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Anand Mohanan
          </a>
        </span>
      </div>
    </footer>
  );
};
