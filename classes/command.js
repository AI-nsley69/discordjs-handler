export class Command {
    constructor() {
        this.usage, this.description = '';
        this.args = {};
        this.permission, this.botPermission = [];
        this.guild = false;
        this.cooldown = 0;
        this.run = () => {};
    }

    setUsage(usage) {
        if (typeof(usage) !== String) throw new Error("Usage is not a string.");
        this.usage = usage;
        return this;
    }

    setDescription(desc) {
        if (typeof(desc) !== String) throw new Error("Description is not a string.");
        this.description = desc;
        return this;
    }


}

export default Command;