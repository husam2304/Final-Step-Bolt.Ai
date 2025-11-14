import React, { useEffect, useState } from "react";
import logo from "./../../assets/Images/logo/logo-finalstep-removebg-preview.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../../services";
import { useMutation } from "@tanstack/react-query";
function MailSend() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(countdown > 0);
    const SendOtp = useMutation({
        mutationFn: () => AuthService.ForgotPassword(state?.email),
    });
    useEffect(() => {
        console.log(state?.email)
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setResendDisabled(false);
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);
    }, [])
    const handleResendEmail = async () => {
        if (loading || resendDisabled) return;

        setLoading(true);
        setError(null);

        try {
            await SendOtp.mutateAsync()
            if (SendOtp.isSuccess) {
                // Start countdown timer
                setResendDisabled(true);
                const timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setResendDisabled(false);
                            return 60;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                setError(SendOtp.error || "فشل إعادة إرسال البريد");
            }
        } catch (err) {
            console.log(err)
            setError("حدث خطأ أثناء محاولة إعادة الإرسال");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forget-password-page">
            <div className="forget-password-card">
                {/* Logo */}
                <div className='logo-container' onClick={() => navigate("/")}>

                    <img src={logo} alt="شعار الجامعة" className="forget-password-logo" />
                </div>
                {/* Title and Instructions */}
                <h2 className="forget-password-title">تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني</h2>
                <p className="forget-password-subtitle" style={{ margin: "20px 0" }}>
                    يرجى التحقق من صندوق الوارد أو مجلد الرسائل غير المرغوب فيها في بريدك الإلكتروني
                </p>

                {/* Error Message */}
                {error && <p className="auth-error">{error}</p>}

                {/* Resend Section */}
                <div className="resend-section">
                    <p>لم تستلم الرابط؟</p>
                    <button
                        className={`forget-password-button ${resendDisabled ? 'disabled' : ''}`}
                        onClick={handleResendEmail}
                        disabled={resendDisabled || loading}
                    >
                        {loading ? 'جاري الإرسال...' :
                            resendDisabled ? `إعادة الإرسال متاحة بعد ${countdown} ثانية` :
                                'إعادة إرسال الرابط'}
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="auth-links">
                    <div className="forget-password-remember">
                        <span>تريد استخدام حساب آخر؟ </span>
                        <Link to="/Auth/ForgetPassword" className="forget-password-link">
                            العودة إلى صفحة نسيان كلمة المرور
                        </Link>
                    </div>
                    <div className="forget-password-remember">
                        <span>تذكرت كلمة المرور؟ </span>
                        <Link to="/Auth/Login" className="forget-password-link">
                            العودة إلى تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MailSend;