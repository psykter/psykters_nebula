# 🐍 Python Interpreter Configuration Guide

## 🔍 Current System Status
- **Python Version**: 3.7.0 (detected)
- **Python Path**: `/Library/Frameworks/Python.framework/Versions/3.7/bin/python3`
- **Recommendation**: Upgrade to Python 3.8+ for better compatibility

## 🚀 Quick Setup Options

### Option 1: Use Current Python (Fastest)
```bash
# Use your existing Python 3.7
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
```

### Option 2: Install Python 3.9+ (Recommended)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python 3.11
brew install python@3.11

# Set up environment
echo 'export PATH="/opt/homebrew/bin/python3:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Option 3: Use Pyenv (Most Flexible)
```bash
# Install pyenv
brew install pyenv

# Install Python 3.11
pyenv install 3.11.0

# Set local Python version
pyenv local 3.11.0

# Add to shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null && eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc
```

## 🛠️ IDE Configuration

### VS Code Setup
1. **Install Python Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search and install "Python" by Microsoft

2. **Select Python Interpreter**
   - Open Command Palette (Cmd+Shift+P)
   - Type "Python: Select Interpreter"
   - Choose the Python 3.11+ path or your current Python 3.7

3. **Configure Workspace**
   - Create `.vscode/settings.json`:
   ```json
   {
       "python.defaultInterpreterPath": "/opt/homebrew/bin/python3",
       "python.linting.enabled": true,
       "python.linting.pylintEnabled": true,
       "python.formatting.provider": "black"
   }
   ```

### IntelliJ/PyCharm Setup
1. **Configure Python Interpreter**
   - File → Settings → Project → Python Interpreter
   - Click ⚙️ → Add
   - Select "System Interpreter"
   - Choose Python 3.11+ path

2. **Set Project Structure**
   - Mark `Psykters Nebula` as Sources Root
   - Configure virtual environment if desired

## 📦 Virtual Environment Setup

### Create Virtual Environment
```bash
# Using venv (built-in)
python3 -m venv eko7_env
source eko7_env/bin/activate

# Using conda (if installed)
conda create -n eko7_env python=3.11
conda activate eko7_env
```

### Install Dependencies
```bash
# Install from requirements file
pip install -r requirements.txt

# Verify installation
pip list
```

## 🔧 Jupyter Configuration

### Kernel Setup
```bash
# Install IPython kernel
pip install ipykernel

# Register kernel
python -m ipykernel install --user --name=eko7-env --display-name="Eko7 Research"

# Launch Jupyter
jupyter lab
```

### Test Jupyter
```python
# In Jupyter notebook cell
import sys
print(f"Python version: {sys.version}")
print(f"Python path: {sys.executable}")

# Test imports
import requests
from bs4 import BeautifulSoup
import pandas as pd
print("✅ All imports successful!")
```

## 🚨 Troubleshooting

### Common Issues

#### "python: command not found"
```bash
# Check available Python versions
ls /usr/bin/python*
ls /opt/homebrew/bin/python*

# Use python3 instead
python3 --version
```

#### "pip: command not found"
```bash
# Use python -m pip
python3 -m pip --version

# Upgrade pip
python3 -m pip install --upgrade pip
```

#### ModuleNotFoundError
```bash
# Install in correct environment
pip install -r requirements.txt

# Check environment
which python
pip list
```

#### Jupyter Kernel Issues
```bash
# List kernels
jupyter kernelspec list

# Remove broken kernel
jupyter kernelspec remove eko7-env

# Reinstall kernel
python -m ipykernel install --user --name=eko7-env
```

## 🎯 Recommended Configuration

### Final Setup Commands
```bash
# 1. Create virtual environment
python3 -m venv eko7_env
source eko7_env/bin/activate

# 2. Upgrade pip
pip install --upgrade pip

# 3. Install dependencies
pip install -r requirements.txt

# 4. Install Jupyter
pip install jupyterlab

# 5. Set up kernel
pip install ipykernel
python -m ipykernel install --user --name=eko7-env

# 6. Test setup
python -c "import requests, bs4, pandas; print('✅ Ready for Eko7 research!')"
```

### Environment Variables (Optional)
```bash
# Add to ~/.zshrc
export PYTHONPATH="$PYTHONPATH:/Users/richarddiaz/ideaprojects/Psykters Nebula"
export EKO7_DATA_DIR="/Users/richarddiaz/ideaprojects/Psykters Nebula/data"
```

## 📱 IDE-Specific Instructions

### For VS Code Users
1. Install Python extension
2. Open the project folder
3. Select Python interpreter
4. Run `eko7_earth_exploration.ipynb`

### For PyCharm Users
1. Open project as "Open"
2. Configure Python interpreter
3. Mark project as Sources Root
4. Run Jupyter notebook

### For Jupyter Lab Direct
```bash
# Navigate to project
cd "/Users/richarddiaz/ideaprojects/Psykters Nebula"

# Activate environment
source eko7_env/bin/activate

# Launch Jupyter
jupyter lab
```

## ✅ Verification Steps

1. **Python Version Check**: `python --version` should show 3.8+
2. **Environment Active**: `which python` should show virtual environment path
3. **Dependencies Installed**: `pip list` should show all required packages
4. **Jupyter Working**: `jupyter lab` launches successfully
5. **Notebook Running**: Can execute cells in `eko7_earth_exploration.ipynb`

---

**Next Steps**: After configuration, test the notebook and verify all imports work correctly! 🪐
