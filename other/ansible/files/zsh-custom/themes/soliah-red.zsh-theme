
export _user_color="%{$fg[red]%}"

PROMPT='$_user_color%n%{$reset_color%}:%{$fg[green]%}%M%{$reset_color%}:%{$fg[cyan]%}%~%b%{$reset_color%} $(git_or_hg_branch)
$ '
