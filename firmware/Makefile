#
# This is a project Makefile. It is assumed the directory this Makefile resides in is a
# project subdirectory.
#

PROJECT_NAME := makerlabs-acm-reader-lock

# Add a new component dir with subdirs containing top-level components
# This must happen before include make/project.mk below
EXTRA_COMPONENT_DIRS ?= \
	$(abspath esp32-network-lib)

include $(IDF_PATH)/make/project.mk

CFLAGS := \
	$(CFLAGS) \
	-fpie

# Replace -std={c++11,gnu++11,gnu++14} with c++14
# This must happen after include make/project.mk above
CXXFLAGS := \
	$(patsubst -std=%,-std=c++14,$(CXXFLAGS)) \
	-finline-small-functions \
	-findirect-inlining \
	-fpie \
	\
	-Wmissing-declarations \
	-Wmissing-include-dirs \
	-Wextra \
	-Wall \
	-Winvalid-pch \
	-Wformat=2 \
	-Wmissing-format-attribute \
	\
	-Wodr \
	\
	-Wno-format-nonliteral
