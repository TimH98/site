import os
 
def rename_files(directory="."):
    renamed = 0
    skipped = 0
 
    for filename in os.listdir(directory):
        if "!" not in filename and "?" not in filename:
            skipped += 1
            continue
 
        new_filename = filename.replace("!", "_").replace("?", "_")
        src = os.path.join(directory, filename)
        dst = os.path.join(directory, new_filename)
 
        if os.path.exists(dst):
            print(f"  SKIP (conflict): '{filename}' → '{new_filename}' already exists")
            skipped += 1
            continue
 
        os.rename(src, dst)
        print(f"  Renamed: '{filename}' → '{new_filename}'")
        renamed += 1
 
    print(f"\nDone. {renamed} file(s) renamed, {skipped} skipped.")
 
if __name__ == "__main__":
    rename_files()