
import apiService from "../utils/apiservices"



export const createUser=(payload)=>apiService.post(`/api/v1/onboard/add/user`, payload);

export const createAgent=(payload)=>apiService.post(`/api/v1/onboard/add/user`, payload);

export const getAllAdmins=()=>apiService.get(`/api/v1/auth/admin`);

export const getAllAgents=()=>apiService.get(`/api/v1/auth/agent`);

export const getAllPlayers=()=>apiService.get(`/api/v1/player`);

export const getAdminAndAgents=()=>apiService.get(`/api/v1/superadmin/admin-agent-hierarchy`);

export const createPlayer=(payload)=>apiService.post(`/api/v1/player/create`, payload);

export const getByDetails=(staf_id)=>apiService.get(`/api/v1/users-list/${staf_id}`);

export const updateUser=(id, payload)=>apiService.put(`/api/v1/users-list/${id}`, payload);

export const deleteUser=(id)=>apiService.delete(`/api/admin/staff/${id}`);






// // Fetch  Users
// const fetchData = async (url) => {
//   try {
//     const response = await Promise.race([
//       apiService.get(url).then((response) => response.data),
//     ]);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Fetch ETag
// const fetchETag = async (url) => {
//   try {
//     const response = await apiService.head(url);
//     console.log('Headers:', response.headers); 

//     // Check if ETag header exists with different casing
//     const etag = response.headers['Stafflist-Etag'] || response.headers['stafflist-etag'];
//     console.log('ETag from server:', etag);

//     return etag || null;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       console.error('Axios Error:', error.message, error.toJSON());
//     } else if (error instanceof Error) {
//       console.error('Error:', error.message);
//     } else {
//       console.error('Unknown Error:', error);
//     }
//     return null;
//   }
// };

// // Get catalogues
// export const getAllUsers = async () => {
//   const url = ALL_USER_URL
//   const cacheKey = "ALL_USERS"
//   const cachedData = localStorage.getItem(cacheKey);

//   if (cachedData) {
//     const cached = JSON.parse(cachedData);
//     console.log('Cached ETag:', cached.etag); // Debugging: Log the cached ETag

//     // Fetch ETag and data in the background
//     setTimeout(async () => {
//       try {
//         const etagServer = await fetchETag(url); // E-tage
//         console.log('Server ETag:', etagServer);
//         if (!etagServer || etagServer !== cached.etag) {
//           const data = await fetchData(url);
//           const etagNew = await fetchETag(url);
//           localStorage.setItem(cacheKey, JSON.stringify({ etag: etagNew, data }));
          
//         }
//       } catch (error) {
//         console.error('Error during update check:', error);
//       }
//     }, 0); 

//     // Return cached data immediately
//     return cached.data;
//   }

//   // Fetch and cache data if not previously cached
//   // First time code
//   try {
//     const data = await fetchData(url);
//     const etagNew = await fetchETag(url);
//     localStorage.setItem(cacheKey, JSON.stringify({ etag: etagNew, data })); // Debugging: Log new ETag set after fetching data
//     console.log('New ETag:', etagNew);
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
