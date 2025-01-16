{
  description = "A flake for Java development";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = { allowUnfree = true; };
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [ corretto21 nodejs ];
          buildInputs = with pkgs; [ maven jdt-language-server ];
        };
      });
}
