import Navbar from "@/components/Navbar";
import styles from "@/styles/Layout.module.scss";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className={styles["page-container"]}>
        {children}
      </div>
    </div>
  );
}
