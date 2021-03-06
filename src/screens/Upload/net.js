import axios from 'axios';

const clientConfig = {
    baseURL: 'http://112.74.160.190:80/api/v1',
    timeout: 10000
};

export default class NetApi {
    constructor() {
        let axiosClient = axios.create(clientConfig);
        axiosClient.interceptors.response.use(
            res => {
                if (res.status !== 200) {
                    return Promise.reject(res);
                }
                return res.data
            },
            err => {
                return Promise.reject(err)
            }
        );
        this.client = axiosClient;
    }

    applyUploadUrl(num, pid, tid) {
        const data = {
            uid: 'admin',
            // pid: pid,
            // tid: tid,
            pid: pid,
            tid: tid,
            method: 'put',
            num: num
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return this.client.post('/source/apply', data, config);
    }

    upload(url, data) {
        //更改host
        //url=url.replace("https://sm-breeze-public.oss-cn-shenzhen.aliyuncs.com","http://112.74.160.190:80/api/v1/put")
        return this.client.request({
            url: url,
            method: 'PUT',
            headers: {
                'Host': 'sm-breeze-public.oss-cn-shenzhen.aliyuncs.com',
                'Connection': 'keep-alive',
                'Accept': '*/*'
            },
            body: data
        });
    }

}