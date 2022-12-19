local is_exec = function(path)
  return vim.fn.executable(path) == 1
end

-- local dapui_icons = { expanded = "", collapsed = "", current_frame = "" }
-- local dapui_controls_icons = {
--   pause = "",
--   play = "",
--   step_into = "",
--   step_over = "",
--   step_out = "",
--   step_back = "",
--   run_last = "",
--   terminate = "",
-- }
local dapui_icons = { expanded = "▽", collapsed = "▷", current_frame = "▷" }
local dapui_controls_icons = {
  pause = "¦",
  play = "▶",
  step_into = "▼",
  step_over = "⮕",
  step_out = "▲",
  step_back = "⬅",
  run_last = "↻",
  terminate = "■",
}

M.plugins = {
  dapui = {
    icons = dapui_icons,
    controls = {
      icons = dapui_controls_icons,
    },
  },
}
