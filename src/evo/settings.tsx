import { useState } from "react";
import { Config } from "./world";

export type SettingsProps = {
    config: Config
    onSave: (cfg: Config) => void
}
type ConfigSetting = {
    name: string
    key: keyof Config
    type: "number" | "boolean"
    description: string
}

export const CONFIGS: ConfigSetting[] = [
    {
        name: "Plant Frequency",
        key: "plantFrequency",
        type: "number",
        description: "How many frames between plant spawns"
    },
    {
        name: "Plant Limit",
        key: "plantLimit",
        type: "number",
        description: "Maximum number of plants in the world (-1 for unlimited)"
    },
    {
        name: "Plant Energy",
        key: "plantEnergy",
        type: "number",
        description: "Energy provided by a plant when consumed"
    },
    {
        name: "Sight (Base)",
        key: "sightBase",
        type: "number",
        description: "Fixed sight distance for creatures"
    },
    {
        name: "Sight (Log)",
        key: "sightLog",
        type: "number",
        description: "How sight distance scales with log of size"
    },
    {
        name: "Sight (Linear)",
        key: "sightLinear",
        type: "number",
        description: "How sight distance scales linearly with size"
    },
    {
        name: "Move Energy (Base)",
        key: "moveEnergyBase",
        type: "number",
        description: "Fixed energy cost for movement"
    },
    {
        name: "Move Energy (Log)",
        key: "moveEnergyLog",
        type: "number",
        description: "How movement energy cost scales with log of size"
    },
    {
        name: "Move Energy (Linear)",
        key: "moveEnergyLinear",
        type: "number",
        description: "How movement energy cost scales linearly with size"
    },
    {
        name: "Move Energy (Quadratic)",
        key: "moveEnergyQuadratic",
        type: "number",
        description: "How movement energy cost scales with size squared"
    },
    {
        name: "Movement Ease",
        key: "movementEase",
        type: "number",
        description: "How far creatures are propelled from one push"
    },
    {
        name: "Size Based Friction",
        key: "sizeBasedFriction",
        type: "boolean",
        description: "Whether movement ease scales with size"
    },
    {
        name: "Run From Predators",
        key: "runFromPredators",
        type: "boolean",
        description: "Whether creatures try to flee from larger creatures"
    },
    {
        name: "Cliffs",
        key: "cliffs",
        type: "boolean",
        description: "Whether creatures die if they hit the world border"
    }
]

export default function Settings({config, onSave}: SettingsProps) {
    const [cfg, setCfg] = useState({...config});
    const [hidden, setHidden] = useState(false);

    const settingsTable = (
        <div>
            <table>
                <tbody>
                    {CONFIGS.map(c => {
                        return (
                            <tr key={c.key}>
                                <td title={c.description} style={{cursor: "help"}}>{c.name}</td>
                                {c.type === "number" && <td><input type="number" value={cfg[c.key as keyof typeof cfg] as number} onChange={e => setCfg({...cfg, [c.key]: parseFloat(e.target.value)})} /></td>}
                                {c.type === "boolean" && <td><input type="checkbox" checked={cfg[c.key as keyof typeof cfg] as boolean} onChange={e => setCfg({...cfg, [c.key]: e.target.checked})} /></td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <span style={{display: "flex", flexDirection: "row"}}>
                <button style={{width: "100%", fontSize: "12pt", cursor: "pointer", margin: "4px"}} onClick={() => onSave(cfg)}>Save</button>
                <button style={{width: "100%", fontSize: "12pt", cursor: "pointer", margin: "4px"}} onClick={() => setHidden(true)}>Minimize</button>
            </span>
        </div>
    )
    return (
        <div style={{
            backgroundColor: "#ffffff88",
            border: "4px solid #000000",
            borderRadius: "12px",
            position: "absolute",
            margin: "8px",
        }}>
            {hidden && <button style={{width: "100%", fontSize: "12pt", backgroundColor: "#ffffff88", cursor: "pointer"}} onClick={() => setHidden(false)}>{"Settings"}</button>}
            {!hidden && settingsTable}
        </div>
    )
}