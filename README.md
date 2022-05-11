# File sorter

Sort files into YYYYMMDD.

### Installation

```
$ npm install -g file-sorter
```

or

```
$ yarn global add file-sorter
```

## Usage

By default sorting happens in the directory where the script was ran, but input & output directory can be set.

Use recursive flag when you also want to sort sub-directories.

If output directory is provided and recursive flag is set all the files will be moved to the output directory.

```
$ fs-sort --help
```

## Example

```
$ fs-sort // sorts current dir
$ fs-sort --i="/path/to/dir/" --o="/path/to/output/dir" // sorts files in input dir to output dir
$ fs-sort --r // sorts current dir and all sub-dirs
$ fs-sort --i="/path/to/dir/" --o="/path/to/output/dir" --r // sorts files in input dir and sub-dirs to output dir
```

## Warning

Using this script can be dangerous, so make sure you double check your parameters before runnings - there's no turning back.
