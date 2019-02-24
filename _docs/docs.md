docs/ {#mainpage}
=========================================

# Overview
## MakerLabs Access Control Management (ACM) System

## Quick Start
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew install yarn

git clone --recursive https://github.com/MakerLabsVan/makerlabs-acm
cd makerlabs-acm
git-crypt unlock ~/Downloads/MakerLabsVan_makerlabs-acm_git-crypt-key
rm ~/Downloads/MakerLabsVan_makerlabs-acm_git-crypt-key

yarn
yarn run login
yarn deploy.test
yarn firmware TARS
```

@subpage system_diagram

@subpage initial_project_setup

@subpage dev_setup

@subpage known_issues

@subpage migration_notes

@subpage migration_checklist

The following top-level directories are used to separate the different
components/modules of the ACM system:
- [_docs/](@ref index), this section -- overview, dev setup/onboarding, operating procedures: ...
- [electrical/](@ref md__docs_electrical) ([API Documentation](@ref electrical)) -- KiCad: ...
- [firmware/](@ref md__docs_firmware) ([API Documentation](@ref firmware)) -- C++/esp-idf: ...
- [functions/](@ref md__docs_functions) ([API Documentation](@ref functions)) -- Dart/AWS Lambda/Firebase Functions: ...
- [scripts/](@ref md__docs_scripts) ([API Documentation](@ref scripts)) -- Javascript/Google Apps Script: ...
- [webcomponents/](@ref md__docs_webcomponents) ([API Documentation](@ref webcomponents)) -- Javascript/LitElement: ...
