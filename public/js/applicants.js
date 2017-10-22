function findMatches(target) {
  const jobId = target.dataset.job
  const matchBy = document.querySelector(`select[data-job="${jobId}"]`).value
  const minScore = document.querySelector(`input[data-job="${jobId}"]`).value

  window.location.href = `/matches?job_id=${jobId}&match_by=${matchBy}&min_score=${minScore}`
}