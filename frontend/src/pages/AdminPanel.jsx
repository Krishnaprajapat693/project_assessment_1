import { useEffect, useState } from "react";
import {
  FolderKanban,
  Users,
  MessageSquare,
  Mail,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import axios from "axios";
import { backendURL } from "../main";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (!showAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <button
          onClick={() => setShowAdmin(true)}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
        >
          Open Admin Panel
        </button>
      </div>
    );
  }

  return <AdminPanel />;
}

function AdminPanel() {
  const [tab, setTab] = useState("projects");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-indigo-50 shadow-sm px-6 py-4 flex justify-between items-center border-b border-indigo-100">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <span className="text-sm font-medium text-indigo-700">Real Trust</span>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-900 text-white min-h-[calc(100vh-73px)] p-6 space-y-2">
          <NavButton
            icon={<FolderKanban className="w-5 h-5" />}
            label="Projects"
            active={tab === "projects"}
            onClick={() => setTab("projects")}
          />
          <NavButton
            icon={<Users className="w-5 h-5" />}
            label="Clients"
            active={tab === "clients"}
            onClick={() => setTab("clients")}
          />
          <NavButton
            icon={<MessageSquare className="w-5 h-5" />}
            label="Contact Forms"
            active={tab === "contacts"}
            onClick={() => setTab("contacts")}
          />
          <NavButton
            icon={<Mail className="w-5 h-5" />}
            label="Subscribers"
            active={tab === "subscribers"}
            onClick={() => setTab("subscribers")}
          />
        </aside>

        {/* Content */}
        <main className="flex-1 p-8">
          {tab === "projects" && <Projects />}
          {tab === "clients" && <Clients />}
          {tab === "contacts" && <Contacts />}
          {tab === "subscribers" && <Subscribers />}
        </main>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        active
          ? "bg-emerald-500 text-white shadow-md"
          : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

/* ---------------- PROJECTS ---------------- */
function Projects() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!formData.name || !formData.description || !formData.image) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const res = await axios.post(`${backendURL}/addproject`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("Project added successfully");
        setFormData({ name: "", description: "", image: null });
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Project Management
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">
          Add Project
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project's Name
            </label>
            <input
              value={formData.name}
              name="name"
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project's Description
            </label>
            <textarea
              value={formData.description}
              name="description"
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
              placeholder="Enter project description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project's Image
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              {formData.image ? (
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {formData.image.name}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Upload project image</p>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              "Adding..."
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Project
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLIENTS ---------------- */
function Clients() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  });

  const handleAdd = async () => {
    if (!formData.name || !formData.description || !formData.image || !formData.designation) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("designation", formData.designation);
      data.append("image", formData.image);

      const res = await axios.post(`${backendURL}/addclient`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("Client added successfully");
        setFormData({ name: "", description: "", image: null, designation: "" });
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Client Management
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">Add Client</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client's Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Enter client name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client's Designation
            </label>
            <input
              name="designation"
              value={formData.designation}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Ex- CEO, Web Developer, Designer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client's Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
              placeholder="Enter client description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client's Image
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              {formData.image ? (
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {formData.image.name}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Upload client image</p>
              )}
              <input
                type="file"
                name="image"
                onChange={(e) => handleChange(e)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? "Adding..." : (
              <>
                <Plus className="w-5 h-5" />
                Add Client
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACTS ---------------- */
function Contacts() {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    // In real app: call DELETE API
    setContacts(contacts.filter((c) => c._id !== id));
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(`${backendURL}/getcontactforms`);
      if (res.data.success) {
        setContacts(res.data.data);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Contact Form Responses
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Mobile
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  City
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {contact.mobileNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {contact.city}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No messages yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SUBSCRIBERS ---------------- */
function Subscribers() {
  const [subscribers, setSubscribers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(`${backendURL}/getsubscribers`);
      if (res.data.success) {
        setSubscribers(res.data.data);
      }
      setLoading(false);
    };
    getData();
  }, []);

  const handleDelete = (id) => {
    setSubscribers(subscribers.filter((s) => s._id !== id));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Subscribed Email Addresses
      </h2>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : subscribers && subscribers.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber._id}
              className="flex justify-between items-center p-5 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {subscriber.email}
                </p>
              </div>
              <button
                onClick={() => handleDelete(subscriber._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          No subscribers yet.
        </div>
      )}
    </section>
  );
}