#!/bin/bash

# 🪐 Psykters Nebula - Python Setup Script
# Automated Python environment configuration for Eko7 research

echo "🌌 Setting up Python environment for Psykters Nebula..."

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found: $(python3 --version)"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    echo "✅ Python found: $(python --version)"
    PYTHON_CMD="python"
else
    echo "❌ Python not found. Please install Python 3.8+ first."
    echo "Visit: https://www.python.org/downloads/"
    exit 1
fi

# Check Python version
PYTHON_VERSION=$($PYTHON_CMD -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
REQUIRED_VERSION="3.8"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PYTHON_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
    echo "✅ Python version $PYTHON_VERSION meets requirements (>= 3.8)"
else
    echo "⚠️  Python version $PYTHON_VERSION is below recommended (3.8+)"
    echo "   Consider upgrading for better compatibility"
fi

# Create virtual environment
echo "🔧 Creating virtual environment..."
$PYTHON_CMD -m venv eko7_env

if [ $? -eq 0 ]; then
    echo "✅ Virtual environment created successfully"
else
    echo "❌ Failed to create virtual environment"
    exit 1
fi

# Activate virtual environment
echo "🚀 Activating virtual environment..."
source eko7_env/bin/activate

# Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📚 Installing required packages..."
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo "✅ Dependencies installed from requirements.txt"
else
    echo "📦 Installing core packages manually..."
    pip install jupyterlab requests beautifulsoup4 pandas matplotlib seaborn
fi

# Install Jupyter kernel
echo "🔌 Setting up Jupyter kernel..."
pip install ipykernel
python -m ipykernel install --user --name=eko7-env --display-name="Eko7 Research"

# Test installation
echo "🧪 Testing installation..."
python -c "
import sys
print(f'Python: {sys.version}')

try:
    import requests
    import bs4
    import pandas
    import matplotlib
    import jupyterlab
    print('✅ All core packages imported successfully!')
except ImportError as e:
    print(f'❌ Import error: {e}')
    sys.exit(1)
"

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Python environment setup complete!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Activate environment: source eko7_env/bin/activate"
    echo "2. Launch Jupyter: jupyter lab"
    echo "3. Open: eko7_earth_exploration.ipynb"
    echo ""
    echo "🪐 Eko7 is ready for research!"
else
    echo "❌ Setup failed. Please check the error messages above."
fi
