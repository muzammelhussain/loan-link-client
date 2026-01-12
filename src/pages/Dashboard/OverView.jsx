import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxios from "../../hooks/useAxios";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

const OverView = () => {
  /* ================= FETCH DATA ================= */
const axiosInstance = useAxios();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosInstance.get("/users")).data,
  });

  const { data: loans = [] } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => (await axiosInstance.get("/loans")).data,
  });

  const { data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: async () =>
      (await axiosInstance.get("/applications")).data,
  });

  /* ================= OVERVIEW ================= */

  const totalUsers = users.length;
  const suspendedUsers = users.filter(u => u.status === "Suspended").length;

  const totalLoans = loans.length;
  const homeLoans = loans.filter(l => l.showOnHome).length;

  const totalApplications = applications.length;
  const approvedApplications = applications.filter(
    a => a.status === "approved"
  ).length;

  /* ================= CHART DATA ================= */

  // Applications Status Pie
  const applicationStatusData = applications.reduce((acc, app) => {
    const status = app.status || "pending";
    const found = acc.find(i => i.name === status);
    if (found) found.value += 1;
    else acc.push({ name: status, value: 1 });
    return acc;
  }, []);

  // Loan Category Bar
  const loanCategoryData = loans.reduce((acc, loan) => {
    const category = loan.category || "Other";
    const found = acc.find(i => i.name === category);
    if (found) found.count += 1;
    else acc.push({ name: category, count: 1 });
    return acc;
  }, []);

  // Applications Timeline (Line)
  const applicationTimelineData = applications.map(app => ({
    date: new Date(app.appliedAt).toLocaleDateString(),
    amount: Number(app.loanAmount),
  }));

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-8"> Dashboard Overall</h1>

      {/* ============ OVERVIEW CARDS ============ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 bg-base-200 ">
        <Card title="Total Users" value={totalUsers} />
        <Card title="Suspended Users" value={suspendedUsers} />
        <Card title="Total Loans" value={totalLoans} />
        <Card title="Applications" value={totalApplications} />
      </div>

      {/* ============ CHARTS ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Applications Status */}
        <ChartBox title="Application Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={applicationStatusData} dataKey="value" label>
                {applicationStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* Loan Categories */}
        <ChartBox title="Loan Categories">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanCategoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* ============ LINE CHART ============ */}
      <ChartBox title="Loan Amount Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={applicationTimelineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="amount" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>

      {/* ============ TABLE ============ */}
      <div className="bg-base-200 p-6 rounded-xl shadow mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Recent Loan Applications
        </h2>
        <table className="w-full border">
          <thead className="bg-base-200">
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Loan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.slice(0, 5).map(app => (
              <tr key={app._id} className="text-center">
                <td className="border p-2">{app.userEmail}</td>
                <td className="border p-2">{app.loanTitle}</td>
                <td className="border p-2">৳ {app.loanAmount}</td>
                <td className="border p-2">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Card = ({ title, value }) => (
  <div className="bg-base-200 p-6 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-base-200 p-6 rounded-xl shadow">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default OverView;
