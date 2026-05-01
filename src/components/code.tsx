
export default function Code({children}: {children: React.ReactNode}) {
    return (
        <span style={{fontFamily: "monospace", background: "#fff3", padding: "0.1rem", borderRadius: "0.2rem", border: "2px solid #0003"}}>{children}</span>
    )
}