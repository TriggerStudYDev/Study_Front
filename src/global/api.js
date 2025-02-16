const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getUniversities = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/universities/`)
    return await response.json()
}

export const getFaculties = async (universityId) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/faculties/?university_id=${universityId}`)
    return await response.json()
}

export const getDepartments = async (facultyId) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/departments/?faculty_id=${facultyId}`)
    return await response.json()
}


