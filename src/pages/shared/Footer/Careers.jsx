import React from "react";

const jobOpenings = [
  {
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
  },
  {
    title: "Backend Developer",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
  },
  {
    title: "Loan Operations Manager",
    type: "Full-time",
    location: "Hybrid",
  },
];

const Careers = () => {
  return (
    <section className="min-h-screen bg-base-100 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">
            Careers at LoanLink
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Join our mission to provide transparent, accessible, and ethical
            loan solutions for individuals and businesses.
          </p>
        </div>

        {/* Culture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Purpose-Driven", desc: "We build products that create real financial impact." },
            { title: "Remote Friendly", desc: "Flexible work culture with global collaboration." },
            { title: "Growth Focused", desc: "We invest in learning, leadership, and long-term careers." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-base-200 p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-base-content">
            Open Positions
          </h2>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-base-200 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-sm opacity-80">
                    {job.type} · {job.location}
                  </p>
                </div>

                <button className="mt-4 md:mt-0 btn btn-primary">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
