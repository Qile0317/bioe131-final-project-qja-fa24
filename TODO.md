# TODO list (devs only)

## Final feature list

- [ ] CLI tool
    - [x] Database installer
    - [ ] optional arguments to compute metrics to add to metadata
        - [ ] MAF frequency
        - [ ] Nucleotide diversity
        - [ ] alignment?
        - [ ] seed frequencies?
        - [ ] filter all results by "hit distance" without cap?
    - [x] Adding as tracks to jbrowse2

- [ ] Web interface (I think this is actually a db EXPLORER in this case instead of a search tool)
    - [x] Redo front page to remove input of fasta sequence field
    - [ ] Implement metadata filtering for query result with SQL
    - [x] Incorporate visualization widget that is generic extensible to any react component
        - [ ] interactive geographic component that has adaptable points
        - [ ] jbrowse2 integration
