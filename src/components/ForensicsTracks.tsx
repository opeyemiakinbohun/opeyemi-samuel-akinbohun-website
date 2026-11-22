const tracks = [
  {
    title: "MSc forensic coursework",
    label: "academic exercises, 2024",
    steps: [
      { t: "Examine evidence", d: "FTK Imager, Autopsy, EnCase" },
      { t: "Document observations", d: "a running record of what was done and seen" },
      { t: "Report findings", d: "conclusions the evidence supports" },
    ],
  },
  {
    title: "PhD network investigations",
    label: "controlled attacks on my own testbed",
    steps: [
      { t: "Capture", d: "tcpdump at several points, examined in Wireshark" },
      { t: "Collect logs", d: "Mosquitto broker logs, consumer and Home Assistant logs" },
      { t: "Correlate", d: "Python scripts match timestamps and message identifiers" },
      { t: "Verify", d: "SHA-256 hashes and independent audit scripts" },
    ],
  },
];

export function ForensicsTracks() {
  return (
    <figure className="panel" style={{ margin: "28px 0" }}>
      <div className="tracks">
        {tracks.map((t) => (
          <div className="track" key={t.title}>
            <div>
              <span className="label">{t.label}</span>
              <h3>{t.title}</h3>
            </div>
            <ol>
              {t.steps.map((s) => (
                <li key={s.t}>{s.t}<span>{s.d}</span></li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption className="panel-foot">Two separate sources of experience. Neither was professional criminal casework.</figcaption>
    </figure>
  );
}
