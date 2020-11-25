# Whitelabeling magic
set -e

BUILD_WHITELABEL=true
if [ ${BUILD_WHITELABEL} = true ]; then
    APP_NAME=$(find "${WORKSPACE}"/dist/ -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)
    DIST_DIR=${WORKSPACE}/dist/${APP_NAME}
    OUTPUT_DIR=${WORKSPACE}/output/${APP_NAME}

    mkdir -p "$OUTPUT_DIR"
    mv "$DIST_DIR" "${OUTPUT_DIR}/default"

    WHITELABELS=$(find "${WORKSPACE}"/ui-kit/tmp/whitelabel/configs/ -not -path '*/\.*' -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)
    mkdir wl_tmp

    echo "$WHITELABELS" |xargs -n1 -P3 -I{} -- sh -ec '
        echo "Processing whitelabel $1"
        rsync --link-dest=../../ --relative --recursive --exclude=/wl_tmp ./ wl_tmp/$1
        yarn run prod -- --env.whitelabel=${1}
        mv '"$DIST_DIR"' '"$OUTPUT_DIR"'/${1}
    ' - {}

    mv "${OUTPUT_DIR}" "${WORKSPACE}"/dist/
fi

# This is to prevent the legacy code working. Should be temporary here.
exit 0



# Whitelabeling magic
BUILD_WHITELABEL=true
if [ ${BUILD_WHITELABEL} = true ]; then
    APP_NAME=$(find ${WORKSPACE}/dist/ -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)
    DIST_DIR=${WORKSPACE}/dist/${APP_NAME}
    OUTPUT_DIR=${WORKSPACE}/output/${APP_NAME}

    mkdir -p ${OUTPUT_DIR}
    mv ${DIST_DIR} ${OUTPUT_DIR}/default

    WHITELABELS=$(find ${WORKSPACE}/ui-kit/tmp/whitelabel/configs/ -not -path '*/\.*' -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)
    for WHITELABEL in ${WHITELABELS}; do
        yarn run prod -- --env.whitelabel=${WHITELABEL}
        mv ${DIST_DIR} ${OUTPUT_DIR}/${WHITELABEL}
    done

    mv ${OUTPUT_DIR} ${WORKSPACE}/dist/
fi
