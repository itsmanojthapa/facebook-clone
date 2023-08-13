import "./style.css";
import { ErrorMessage, useField } from "formik";
export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      {
        //when component is touched and there is error div will appear and vise versa
      }
      {meta.touched && meta.error && !bottom && (
        <div className="input_error" style={{ transform: "translate(0px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_top"></div>
          )}
        </div>
      )}
      <input
        //when this metadata is checked classname be set
        className={meta.touched && meta.error ? "input_error_border" : " "}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div className="input_error" style={{ transform: "translate(0px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_bottom"></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i className="error_icon" style={{ top: `${!bottom && "60%"}` }}></i>
      )}
    </div>
  );
}
