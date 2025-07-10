interface JobType {
    id: number;
    company: string;
    logo: string;
    new: boolean;
    featured: boolean;
    position: string;
    role: string;
    level: string;
    postedAt: string;
    contract: string;
    location: string;
    languages: string[];
    tools: string[];
}

interface JobListingProps {
    job: JobType;
    addFilter: (filter: string) => void;
}

function JobListing({job, addFilter}: JobListingProps) {
    const handleFilterClick = (filter: string) => {
        addFilter(filter);
    };

    // Combine all filterable items and remove duplicates
    const filterItems = [
        job.role,
        job.level,
        ...job.languages,
        ...job.tools
    ].filter((item, index, self) => item && self.indexOf(item) === index);

    return (
        <div
            className={`relative flex flex-col md:flex-row justify-between items-center gap-4 bg-white ${job.featured ? 'border-l-4 border-primary-02':''} px-5 md:px-8 py-6 rounded-md shadow-lg`}>
            {/* Mobile Image */}
            <div className="md:hidden absolute -top-8 left-6 w-16 h-16 flex items-center justify-center">
                <img
                    src={`.${job.logo}`}
                    alt={job.company}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Desktop Image and Job Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                <img
                    src={`${job.logo}`}
                    alt={job.company}
                    className="hidden md:block w-20 h-20 object-contain"
                />

                <div className="mt-4 md:mt-0">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h3 className="font-bold text-primary-02">{job.company}</h3>
                        <div className="flex gap-2">
                            {job.new && (
                                <span
                                    className="inline-block rounded-full px-2.5 py-1 text-xs font-bold text-white bg-primary-02 uppercase">
                  New!
                </span>
                            )}
                            {job.featured && (
                                <span
                                    className="inline-block rounded-full px-2.5 py-1 text-xs font-bold text-white bg-primary-03 uppercase">
                  Featured
                </span>
                            )}
                        </div>
                    </div>

                    <h2 className="my-2 text-lg font-bold text-primary-03 hover:text-primary-02 cursor-pointer">
                        {job.position}
                    </h2>

                    <ul className="flex flex-wrap items-center gap-x-2 text-neutral-500 font-medium">
                        <li>{job.postedAt}</li>
                        <li className="relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-gray-400">
                            {job.contract}
                        </li>
                        <li className="relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-gray-400">
                            {job.location}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider - Mobile only */}
            <hr className="w-full border-t border-neutral-300 md:hidden"/>

            {/* Filter Tags */}
            <ul className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {filterItems.map((item) => (
                    <li key={item}>
                        <button
                            type="button"
                            onClick={() => handleFilterClick(item)}
                            className="bg-primary-01 text-primary-02 hover:bg-primary-02 hover:text-white transition-colors font-bold px-3 py-1 rounded-md text-sm"
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JobListing;
