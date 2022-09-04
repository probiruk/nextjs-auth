import Head from "next/head";
import styles from "../../styles/auth.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/auth.schema";

export default function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitForm = (data) => {
    alert("Success");
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div>
            <div className={styles.form}>
              <div className={styles.title}>Login</div>

              <form onSubmit={handleSubmit(submitForm)}>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <i className="bx bx-envelope icon"></i>
                </div>
                <p className={styles.formError}>{errors.email?.message}</p>
                <div className={styles.inputField}>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <i className={`${styles.icon} bx bx-lock-alt`}></i>
                  <i className={`${styles.showHidePw} bx bx-low-vision`}></i>
                </div>
                <p className={styles.formError}>{errors.password?.message}</p>
                <div className={styles.checkboxText}>
                  <div className={styles.checkboxContent}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      {...register("rememberMe")}
                      id="logCheck"
                    ></input>
                    <label htmlFor="logCheck" className={styles.text}>
                      Remember me
                    </label>
                  </div>
                  <a className={styles.text}>Forgot password?</a>
                </div>
                <div className={`${styles.inputField} ${styles.button}`}>
                  <input type="submit" value="Login" required />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
