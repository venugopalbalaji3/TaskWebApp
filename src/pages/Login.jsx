import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/api";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/logo.png";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth) {
        console.error("AuthContext is undefined. Make sure AuthProvider is wrapping your app.");
    }

    const { login } = auth || {};

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const data = await loginUser(values.email, values.password);
                console.log(data,'token')
                login(data.data.token);
                sessionStorage.setItem("user_id",data.data.user._id)
                navigate("/tasks");
            } catch (error) {
                setErrors({ password: "Invalid credentials" });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100">
                <Col md={6} className="d-none d-md-flex flex-column align-items-start justify-content-center ps-5">
                    <img src={logo} alt="Logo" style={{ width: "150px", marginBottom: "20px" }} />
                    <h1 className="fw-bold">Join 8 Million Businesses</h1>
                    <p className="fs-5 text-muted">Powering Growth with Lemonpay!</p>
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                    <div className="p-4 shadow rounded bg-white w-75" style={{ maxWidth: "400px" }}>
                        <h2 className="text-center mb-3">Welcome Login System</h2>
                        <p className="text-center text-muted">Your gateway to seamless transactions and easy payments.</p>
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    {...formik.getFieldProps("email")}
                                    invalid={formik.touched.email && !!formik.errors.email}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-danger">{formik.errors.email}</div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Min 8 characters"
                                    {...formik.getFieldProps("password")}
                                    invalid={formik.touched.password && !!formik.errors.password}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-danger">{formik.errors.password}</div>
                                )}
                            </FormGroup>
                            <FormGroup check className="d-flex justify-content-between align-items-center">
                                <Label check>
                                    <Input type="checkbox" /> Remember me
                                </Label>
                                <a href="#" className="text-primary text-decoration-none">Forgot password?</a>
                            </FormGroup>
                            <Button type="submit" color="primary" block className="mt-3 w-100">
                                {formik.isSubmitting ? "Logging in..." : "Sign in"}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

