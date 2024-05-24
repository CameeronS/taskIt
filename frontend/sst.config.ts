import { SSTConfig } from "sst"
import { Service } from "sst/constructs"
import { StaticSite } from "sst/constructs"

export default {
  config(_input) {
    return {
      name: "frontend",
      region: "eu-west-2",
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const web = new StaticSite(stack, "Site", {
        path: "./",
        buildOutput: "dist",
        buildCommand: "bun run build",
      })

      stack.addOutputs({
        CloudfrontUrl: web.url,
      })
    })
  },
} satisfies SSTConfig
