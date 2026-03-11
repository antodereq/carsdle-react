import { useState } from "react";

export default function ReportBugPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState(null);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");
    const [uploaded, setUploaded] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();
        if (loading) return;

        setErrors([]);
        setSuccess("");
        setUploaded(null);

        const fd = new FormData();
        fd.append("full_name", fullName);
        fd.append("email", email);
        fd.append("subject", subject);
        fd.append("message", message);
        if (attachment) fd.append("attachment", attachment);

        setLoading(true);
        try {
            const res = await fetch("/api/zglosBlad.php", {
                method: "POST",
                body: fd,
                credentials: "include",
                headers: { Accept: "application/json" },
            });

            const data = await res.json();

            if (data && data.ok) {
                setSuccess(data.message || "Wysłano.");
                setUploaded(data.uploaded || null);
            } else {
                setErrors(Array.isArray(data?.errors) ? data.errors : ["Nie udało się wysłać zgłoszenia."]);
            }
        } catch {
            setErrors(["Błąd sieci / serwera. Spróbuj ponownie."]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container my-4">
            <header className="text-center mb-3">
                <h1 className="site-title display-6 fw-bold">
                    Zgłoś <span className="text-danger">błąd</span>
                </h1>
                <p className="text-muted mb-0">Wypełnij formularz i dołącz plik.</p>
            </header>

            {errors.length ? (
                <div className="alert alert-danger mx-auto" style={{ maxWidth: 900 }}>
                    <div className="fw-semibold mb-2">Popraw:</div>
                    <ul className="mb-0">
                        {errors.map((x, i) => (
                            <li key={i}>{x}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {success ? (
                <div className="alert alert-success mx-auto" style={{ maxWidth: 900 }}>
                    ✅ {success}
                    {uploaded?.original ? (
                        <div className="small text-muted mt-1">Załącznik: {uploaded.original} — zapisano.</div>
                    ) : null}
                </div>
            ) : null}

            <section className="mx-auto" style={{ maxWidth: 900 }}>
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <form onSubmit={onSubmit} noValidate>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Imię i nazwisko *</label>
                                    <input
                                        className="form-control"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">E-mail *</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Temat *</label>
                                    <input
                                        className="form-control"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Opis *</label>
                                    <textarea
                                        className="form-control"
                                        rows={6}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Załącznik (wymagany) *</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                                        disabled={loading}
                                        accept=".png,.jpg,.jpeg,.webp,.gif,.pdf,.txt,.log,.zip,.7z,.rar"
                                    />
                                    <div className="form-text">Max 10 MB. Dozwolone: PNG/JPG/WEBP/GIF/PDF/TXT/LOG/ZIP/7Z/RAR.</div>
                                </div>

                                <div className="col-12 d-flex gap-2">
                                    <button className="btn btn-primary" disabled={loading}>
                                        {loading ? "Wysyłanie..." : "Wyślij zgłoszenie"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        disabled={loading}
                                        onClick={() => {
                                            setErrors([]);
                                            setSuccess("");
                                            setUploaded(null);
                                        }}
                                    >
                                        Wyczyść komunikaty
                                    </button>
                                </div>

                                <div className="col-12">
                                    <p className="text-muted small mb-0">Pola oznaczone * są wymagane.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}