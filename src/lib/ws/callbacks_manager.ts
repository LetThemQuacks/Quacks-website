type Callbacks_Dict = {
    [packet_type: string]: {
        callback: CallableFunction,
    }
};

class CallbacksManager {
    static callbacks_dict: Callbacks_Dict = {
        /*
            packet_type: {
                callback: <function>
            }
        */
    };

    static register_callback(packet_type: string, callback: CallableFunction) {
        if (Object.keys(CallbacksManager.callbacks_dict).includes(packet_type)) {
            throw Error(`Callback "${packet_type}" already assigned to ${CallbacksManager.callbacks_dict[packet_type]}`);
        }

        CallbacksManager.callbacks_dict[packet_type] = {
            callback: callback
        }
    }

}

export default CallbacksManager

