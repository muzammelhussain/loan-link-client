import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Secure Platform",
      desc: "Your data and loan process are fully encrypted.",
    },
    {
      title: "24/7 Support",
      desc: "We provide instant customer support.",
    },
    {
      title: "Fast Approval",
      desc: "Loan decisions made within 24 hours.",
    },
  ];

  return (
    <section className="py-20 bg-blue-50 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {features.map((item, index) => (
          <div key={index} className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
