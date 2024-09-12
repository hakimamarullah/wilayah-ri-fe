import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "./css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.description}>
          <h2>Pretty Digits</h2>
          <p>
            Your go-to destination for unique and aesthetically pleasing phone
            numbers. At Pretty Digits, we offer a curated selection of
            attractive phone numbers that stand out. Designed with elegance and
            sophistication, each number is chosen to reflect your unique style.
          </p>
        </div>
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <p>Email: support@prettydigits.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Queens Street, Suite 100, City, Country</p>
        </div>
        <div className={styles.social}>
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href="http://twitter.com/hakim_amarullah" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/hakim.amarullah/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          © 2024 Pretty Digits. All Rights Reserved. | Designed with ♥ by Queens
          Group.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
