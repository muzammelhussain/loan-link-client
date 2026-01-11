import React from "react";

const impactStats = [
  { value: "5M+", label: "Funds Distributed" },
  { value: "1,200+", label: "Loans Approved" },
  { value: "95%", label: "Approval Transparency" },
  { value: "500+", label: "Communities Impacted" },
];

const Impact = () => {
  return (
    <section className="min-h-screen bg-base-200 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">
            Our Impact
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            We measure success by the positive change we bring to individuals,
            businesses, and communities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-xl p-6 shadow text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-base-100 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">
              Empowering Small Businesses
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              LoanLink has helped hundreds of entrepreneurs access capital,
              expand operations, and create local employment opportunities.
            </p>
          </div>

          <div className="bg-base-100 p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">
              Financial Inclusion
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Our platform ensures fair access to loans with transparent terms,
              supporting underbanked communities across regions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
