import {useState} from "react";
import JobListing from "./components/JobListing.tsx";
import iconRemove from "../public/images/icon-remove.svg";
import jobs from "../data.json";

function App() {
    const [filters, setFilters] = useState<string[]>([]);

    // Add filter to the list
    const addFilter = (filter: string) => {
        if (!filters.includes(filter)) {
            setFilters([...filters, filter]);
        }
    };

    // Remove filter from the list
    const removeFilter = (filterToRemove: string) => {
        setFilters(filters.filter(filter => filter !== filterToRemove));
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters([]);
    };

    // Filter jobs based on active filters
    const filteredJobs = filters.length > 0
        ? jobs.filter(job => {
            const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
            return filters.every(filter => jobTags.includes(filter));
        })
        : jobs;

    return (
        <>
            <main className="grid grid-cols-1 gap-10">
                <header className="header relative">
                    {filters.length > 0 && (
                        <div
                            className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-[calc(100%-2rem)] mx-auto md:container flex justify-between items-center gap-4 bg-white px-6 md:px-10 py-5 rounded shadow-2xl shadow-slate-300"
                        >
                            <ul className="flex items-center gap-4 flex-wrap">
                                {filters.map((filter) => (
                                    <li key={filter} className="flex">
                    <span
                        className="bg-primary-01 text-sm text-primary-02 font-bold px-3 py-2 rounded-tl-md rounded-bl-md flex items-center">
                      {filter}
                    </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFilter(filter)}
                                            role="button"
                                            className="bg-primary-02 hover:bg-primary-03 text-white cursor-pointer font-bold px-3 py-2 rounded-tr-md rounded-br-md flex items-center justify-center"
                                        >
                                            <img className="w-3 h-3" src={iconRemove} alt="x"/>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-gray-400 cursor-pointer hover:underline font-bold"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </header>
                <section className="container mx-auto px-4 md:px-0 flex flex-col gap-14 md:gap-6 mt-12">
                    {filteredJobs.map((job) => (
                        <JobListing
                            key={job.id}
                            job={job}
                            addFilter={addFilter}
                        />
                    ))}
                </section>

                <div className="text-center">
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend
                    Mentor</a>.
                    Coded by <a href="https://github.com/oziriz31" className="text-primary-02 font-bold">Yvan Akoo</a>.
                </div>
            </main>
        </>
    );
}

export default App;
