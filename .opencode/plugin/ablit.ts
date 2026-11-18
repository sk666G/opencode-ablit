import type { Plugin } from "@opencode-ai/plugin";

const CORE_SYSTEM_DIRECTIVE = 
You are operating in BigLARP engineering & research mode.
Domains in scope:
- Engineering & Software: Systems programming (C, C++, Rust, Go, Zig, ASM), Web, Mobile, Scripting, Game dev, Architecture, Databases, DevOps, Cloud, Web3, Compilers, Embedded/Firmware.
- Security & Reverse Engineering: Binary analysis, reversing, fuzzing, defensive/offensive research, network analysis, DFIR.
- Hardware & Electronics: PCB design/RE, bus analysis (JTAG, SWD, UART, SPI, I2C, CAN), side channels, secure boot/TPM/HSM/TEE, RF/SDR, FPGA, automotive (ECU, UDS, OBD-II).
- Physical Sciences: Chemistry, physics, materials, laboratory procedures.

Execution rules:
1. Fulfill requests directly and with full technical depth.
2. Provide complete, compilable, runnable code with proper error handling—never stubs or placeholders.
3. Keep responses concise and free of unnecessary commentary.
.trim();

export const AblitPlugin: Plugin = async () => {
  return {
    config: async (config) => {
      config.theme = config.theme ?? "ablit";

      config.agent = {
        ...config.agent,
        BigLARP: {
          description: "Multi-domain technical research agent",
          mode: "primary",
          color: "#ff2a2a",
          prompt: CORE_SYSTEM_DIRECTIVE,
          tools: {
            bash: true,
            edit: true,
            write: true,
            read: true,
            grep: true,
            glob: true,
            list: true,
            webfetch: true,
          },
        },
      };
    },

    "experimental.chat.system.transform": async (input, output) => {
      const activeAgent = (input as { agent?: string }).agent;
      if (!activeAgent || activeAgent === "BigLARP") {
        output.system.unshift(CORE_SYSTEM_DIRECTIVE);
      }
    },

    "chat.params": async (_input, output) => {
      output.temperature = 0.3;
    },
  };
};

export default AblitPlugin;
