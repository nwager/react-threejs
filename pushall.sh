if [[ $# -ne 1 ]]; then
	echo "Illegal number of arguments." >&2
	exit 1
fi

git pull origin master && git add . && git commit -m "$1" && git push origin master && npm run deploy