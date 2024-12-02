{
  description = "Advent of Code 2021";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    neovim-flake.url = "github:hasundue/neovim-flake";
  };

  outputs = { nixpkgs, flake-utils, neovim-flake, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        neovim = with neovim-flake.${system}; mkNeovim {
          # Make sure NOT to enable Copilot!
          modules = with neovimModules; [ core deno nix ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            git
            gh
            neovim
          ];
        };
      }
    );
}