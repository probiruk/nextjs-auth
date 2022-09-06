/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import styles from "../../styles/auth.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/auth.schema";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/auth.slice";
import { useLoginMutation } from "../../redux/auth/auth.api";
import { useState } from "react";
import { useRouter } from "next/router";

export default function login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitForm = async (data) => {
    try {
      const loginResponse = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (loginResponse?.err) {
        return setError("Wrong email or password");
      }
      dispatch(
        setCredentials({
          user: loginResponse.data.user,
          token: loginResponse.data.token.value,
        })
      );
      setError("");
      setSuccess("Logged in successfully");
      router.push("/");
    } catch (err) {
      console.log(err);
      setError("Opps! Something went wrong");
      setSuccess("");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.mainContainer}>
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        <div className={styles.container}>
          <div>
            <div className={styles.form}>
              <div className={styles.title}>Login</div>
              <p className={`${styles.formError} text-center`}>
                {error && error}
              </p>
              <p className={`${styles.formSuccess} text-center`}>
                {success && success}
              </p>
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
                  <input
                    disabled={isLoading}
                    type="submit"
                    value="Login"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
