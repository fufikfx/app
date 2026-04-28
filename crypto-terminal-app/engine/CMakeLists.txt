cmake_minimum_required(VERSION 3.16)
project(crypto_terminal_engine LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(telemetry_engine
  src/main.cpp
)

if(APPLE)
  target_compile_definitions(telemetry_engine PRIVATE _DARWIN_C_SOURCE)
endif()

cmake_minimum_required(VERSION 3.20)
project(crypto_engine LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(crypto_engine
  src/main.cpp
)

if(APPLE)
  target_compile_options(crypto_engine PRIVATE -Wall -Wextra -Wpedantic)
endif()

