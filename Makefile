export DIR_WORKSPACE := build/workspace

default:
	#

# ---
# --- Testing
# ---

.PHONY: \
	test

test:
	npx jest --verbose --colors

# ---
# --- Package Build
# ---

.PHONY: \
	build \
	build.clean \
	build.setup \
	build.compile \
	build.compile.verify \
	build.compile.clean \
	build.package \
	build.package.verify \
	build.package.install

build: \
	build.clean \
	build.setup \
	build.compile \
	build.compile.verify \
	build.compile.clean \
	build.package \
	build.package.verify

build.clean:
	rm -rf ${DIR_WORKSPACE}/*

build.setup:
	mkdir -p ${DIR_WORKSPACE}

build.compile:
	npx tsc -p build/tsconfig.json

build.compile.verify:
	test -f ${DIR_WORKSPACE}/index.js
	test -f ${DIR_WORKSPACE}/index.d.ts

	test -d ${DIR_WORKSPACE}/core
	test -f ${DIR_WORKSPACE}/core/assert-never.js
	test -f ${DIR_WORKSPACE}/core/assert-never.d.ts

build.compile.clean:
	# Delete all tests and proof files to reduce the impact of the package.
	find ${DIR_WORKSPACE} -type f -name "*.bench.js" -delete
	find ${DIR_WORKSPACE} -type f -name "*.proof.js" -delete
	find ${DIR_WORKSPACE} -type f -name "*.spec.js" -delete
	find ${DIR_WORKSPACE} -type f -name "*.test.js" -delete

	# Ensure all typescript files remaining are declaration files.
	# In this case, ensure we remove the declaration files for tests that was generated.
	find ${DIR_WORKSPACE} -type f -name "*.bench.d.ts" -delete
	find ${DIR_WORKSPACE} -type f -name "*.proof.d.ts" -delete
	find ${DIR_WORKSPACE} -type f -name "*.spec.d.ts" -delete
	find ${DIR_WORKSPACE} -type f -name "*.test.d.ts" -delete

build.package:
	cp README.md ${DIR_WORKSPACE}/README.md
	cp package.json ${DIR_WORKSPACE}/package.json
	cp package-lock.json ${DIR_WORKSPACE}/package-lock.json

build.package.verify:
	test -f ${DIR_WORKSPACE}/package.json
	test -f ${DIR_WORKSPACE}/package-lock.json

# ---
# --- Package Build
# ---

.PHONY: \
	package \
	package.publish \
	package.publish.next

package:
	npm publish --access public --dry-run ./${DIR_WORKSPACE}

package.publish:
	npm publish --access public --tag latest ./${DIR_WORKSPACE}

package.publish.next:
	npm publish --access public --tag next ./${DIR_WORKSPACE}

# ---
# --- Versioning
# ---

.PHONY: \
	version.major \
	version.minor \
	version.patch

version.major:
	npm version --no-git-tag-version major

version.minor:
	npm version --no-git-tag-version minor

version.patch:
	npm version --no-git-tag-version patch
