import { useRef } from 'react';
import { useProjects } from './projectHooks';
import ProjectList from './ProjectList';

function ProjectsPage() {
  const {
    data,
    isPending,
    error,
    isError,
    isFetching,
    page,
    setPage,
    setName,
  } = useProjects();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (query: string) => {

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // limpia el timeout anterior
    }

    debounceTimeout.current = setTimeout(() => {
      setName(query.trim());
    }, 1200);
  }


  return (
    <div className='px-16'>
      <h1>Projects</h1>
      <div className="search-box">
        <input
          type="text"
          onChange={(e) => debounce(e.target.value)}
          placeholder="Search..."
          className="!rounded-xl !my-3 outline-blue-300 outline-2"
        />

      </div>
      {data ? (
        <>
          {isFetching && !isPending && (
            <span className="toast">Refreshing...</span>
          )}
          <ProjectList projects={data} />
          <div className="row">
            <div className="col-sm-4">Current page: {page + 1}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button "
                  onClick={() => setPage((oldPage) => oldPage - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => {
                    // if (!isPreviousData) {
                    setPage((oldPage) => oldPage + 1);
                    // }
                  }}
                  disabled={data.length != 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : isPending ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectsPage;