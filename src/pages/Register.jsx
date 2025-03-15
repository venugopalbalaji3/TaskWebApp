import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../assets/logo.png";

const Register = () => {
    const navigate = useNavigate();

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
                await registerUser(values.email, values.password);
                navigate("/login");
            } catch (error) {
                setErrors({ password: "Registration failed. Try again." });
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
                        <h2 className="text-center mb-3">Create Your Account</h2>
                        <p className="text-center text-muted">Get started with seamless transactions.</p>
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
                                    placeholder="Min 6 characters"
                                    {...formik.getFieldProps("password")}
                                    invalid={formik.touched.password && !!formik.errors.password}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-danger">{formik.errors.password}</div>
                                )}
                            </FormGroup>
                            <Button type="submit" color="primary" block className="mt-3 w-100">
                                {formik.isSubmitting ? "Registering..." : "Sign Up"}
                            </Button>
                            <p className="text-center mt-3">
                                Already have an account? <a href="/login" className="text-primary text-decoration-none">Sign in</a>
                            </p>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;








