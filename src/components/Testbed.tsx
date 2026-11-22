import { Logo } from "./Logo";

/**
 * Architecture of the five-system research testbed. Built from HTML boxes on a
 * grid so labels never collide; connector lines are decorative SVG.
 */
const nodes = [
  { id: "ha", name: "Home Assistant OS", logo: "homeassistant", role: "Automations and verified virtual-light actions" },
  { id: "sensors", name: "Sensor publisher", logo: "ubuntu", role: "Ubuntu. 15 simulated streams, 5 types x 3" },
  { id: "broker", name: "MQTT broker", logo: "mosquitto", role: "Mosquitto with authentication and topic ACLs" },
  { id: "consumer", name: "Authorised consumer", logo: "python", role: "Holds the private key. Adds ciphertexts, decrypts totals" },
  { id: "attacker", name: "Attacker machine", logo: "linux", role: "Isolated. Replay, spoofing, flooding, malformed messages" },
];

export function Testbed({ caption = true }: { caption?: boolean }) {
  return (
    <figure className="panel" style={{ margin: 0 }}>
      <div className="panel-head">
        <span className="label">Research testbed / five virtual machines on VirtualBox</span>
        <span className="label">architecture</span>
      </div>
      <div className="panel-grid-bg testbed">
        <svg className="testbed-lines" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 90 H150 H250" stroke="#8ea2ff" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M250 90 V30" stroke="#52d69a" strokeWidth="1.2" fill="none" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          <path d="M50 150 L150 90" stroke="#ff7a6b" strokeWidth="1.2" fill="none" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        </svg>
        {nodes.map((n) => (
          <div key={n.id} className={`tb-node tb-${n.id}`}>
            <strong><Logo id={n.logo} size={16} decorative />{n.name}</strong>
            <span>{n.role}</span>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="panel-foot">
          <span style={{ color: "#8ea2ff" }}>Blue</span>: Paillier-encrypted sensor messages over MQTT.{" "}
          <span style={{ color: "#52d69a" }}>Green</span>: decisions sent to Home Assistant.{" "}
          <span style={{ color: "#ff7a6b" }}>Red</span>: controlled attack traffic. Paillier protects confidentiality only, so broker access control and relay validation checks are tested separately.
        </figcaption>
      )}
    </figure>
  );
}
