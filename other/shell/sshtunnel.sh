
function sshtunnel_open() { autossh -f -N -L 1234:127.0.0.1:1234 domain.com }

function sshtunnel_close() { kill $(ps aux | grep domain.com | grep 1234 | pgrep autossh) }
