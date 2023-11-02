import { configs, type Configs } from "$lib/stores/server_configs";

const server_confs = async (data: Configs) => configs.set(data);

export default server_confs;

