import http from "../utils/config";

class ApiService {

  getAll(){
    return http.get('/activities/McHacks');
  }
  get(id){
    return  http.get(`/activity/${id}`);
  }
  create(data){
    return http.post(`/activity`, data);
  }
  update(id, data){
    return http.put(`/activity/${id}`, data);
   }
  delete(id){
    return http.delete(`/activity/${id}`);
  }
}

export default new ApiService();