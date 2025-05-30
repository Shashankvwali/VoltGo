import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const stationsData = [
  {
    id: 1,
    name: "Station #1",
    address: "RR Nagar, Bengaluru",
    status: "Available",
    eta: "5 mins away",
  },
  {
    id: 2,
    name: "Station #2",
    address: "Jayanagar, Bengaluru",
    status: "Occupied",
    eta: "10 mins away",
  },
  {
    id: 3,
    name: "Station #3",
    address: "Vijayanagr, Bengaluru",
    status: "Available",
    eta: "3 mins away",
  },
];

function App() {
  const [location, setLocation] = useState("");
  const [stations, setStations] = useState(
    stationsData.map((station) => ({ ...station, reserved: false }))
  );
  const [searchMessage, setSearchMessage] = useState("");

  const handleSearch = () => {
    const filtered = stationsData.filter((s) =>
      s.address.toLowerCase().includes(location.toLowerCase())
    );
    if (filtered.length === 0) {
      setSearchMessage(`Search "${location}" not found`);
    } else {
      setSearchMessage("");
    }
    setStations(
      (filtered.length ? filtered : stationsData).map((station) => ({
        ...station,
        reserved: false,
      }))
    );
  };

  const handleReserve = (id) => {
    setStations((prev) =>
      prev.map((station) =>
        station.id === id ? { ...station, reserved: true } : station
      )
    );
  };

  const handleCancel = (id) => {
    setStations((prev) =>
      prev.map((station) =>
        station.id === id ? { ...station, reserved: false } : station
      )
    );
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          backgroundColor: "#2f855a",
          padding: "20px 40px",
          color: "white",
        }}
      >
        <h1 style={{ margin: 0 }}>🔌 VoltGo</h1>
        <p style={{ margin: 0, fontSize: 14 }}>Smart EV Charging Finder</p>
      </header>

      <div style={{ padding: "30px 20px", maxWidth: 900, margin: "0 auto" }}>
        <section>
          <h2 style={{ marginBottom: 10 }}>🔍 Find Nearby Charging Stations</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FaMapMarkerAlt color="#2f855a" />
            <input
              type="text"
              placeholder="Enter location e.g., Jayanagar"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: "#2f855a",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FaSearch />
              Search
            </button>
          </div>
        </section>

        {searchMessage && (
          <p style={{ color: "#dc3545", marginTop: 20 }}>{searchMessage}</p>
        )}

        <section style={{ marginTop: 40 }}>
          {stations.map((station) => (
            <div
              key={station.id}
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 20,
                marginBottom: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.01)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3 style={{ margin: 0 }}>{station.name}</h3>
              <p style={{ margin: "4px 0" }}>{station.address}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    backgroundColor:
                      station.status === "Available" ? "#d4edda" : "#f8d7da",
                    color:
                      station.status === "Available" ? "#155724" : "#721c24",
                  }}
                >
                  {station.status}
                </span>
                <span style={{ fontSize: 13, color: "#555" }}>
                  ETA: {station.eta}
                </span>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button
                  onClick={() => handleReserve(station.id)}
                  disabled={station.status !== "Available" || station.reserved}
                  style={{
                    backgroundColor:
                      station.status !== "Available"
                        ? "#ccc"
                        : station.reserved
                        ? "#6c757d"
                        : "#2f855a",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    cursor:
                      station.status !== "Available" || station.reserved
                        ? "not-allowed"
                        : "pointer",
                    borderRadius: 6,
                  }}
                >
                  {station.reserved ? "Reserved" : "Reserve Slot"}
                </button>

                {station.reserved && (
                  <button
                    onClick={() => handleCancel(station.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      cursor: "pointer",
                      borderRadius: 6,
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
