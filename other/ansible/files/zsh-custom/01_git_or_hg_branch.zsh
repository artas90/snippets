
function _parse_git_dirty {
    [[ $(git status 2> /dev/null | tail -n1) != "nothing to commit, working directory clean" ]] \
        && echo "%{$fg[yellow]%}⚡%{$reset_color%}" && return
    echo "%{$fg[green]%}✓%{$reset_color%}" && return
}

function _parse_hg_dirty {
    [[ $( hg status 2> /dev/null ) != "" ]] \
        && echo "%{$fg[yellow]%}⚡%{$reset_color%}" && return
    echo "%{$fg[green]%}✓%{$reset_color%}" && return
}

function git_or_hg_branch () {
    git_branch=`git rev-parse --abbrev-ref HEAD 2>/dev/null`
    hg_branch=`hg branch 2>/dev/null` 

    if [[ $git_branch != "" ]]; then
        echo "±:$git_branch "`_parse_git_dirty` && return
    elif [[ $hg_branch != "" ]]; then
        echo "☿:$hg_branch "`_parse_hg_dirty` && return
    else
        echo "○" && return
    fi
}
